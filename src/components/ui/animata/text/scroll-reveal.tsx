import React, { useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  activeIndex: number;
  onIndexChange?: (index: number) => void;
}

/**
 * Transforma os elementos filhos em uma lista achatada, garantindo que os fragments
 * sejam desmembrados corretamente.
 */
const flatten = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as { children?: React.ReactNode };
      if (child.type === React.Fragment) {
        result.push(...flatten(childProps.children));
      } else if (childProps.children) {
        result.push(React.cloneElement(child, {}));
      } else {
        result.push(child);
      }
    } else {
      // Divide strings em fragmentos para melhor animação
      const parts = String(child).split(/(\s+)/);
      result.push(
        ...parts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>),
      );
    }
  });

  return result.flatMap((child) => (Array.isArray(child) ? child : [child]));
};

/**
 * Componente para animar a opacidade dos elementos filhos com base no progresso do scroll.
 */
function OpacityChild({
  children,
  index,
  progress,
  onWordClick,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: number;
  onWordClick?: (index: number) => void;
}) {
  // Controla a opacidade dos elementos baseando-se na posição do scroll
  const opacity = index === progress ? 1 : index < progress ? 0.4 : 0.1
  const isCurrent = index === progress

  // Extrai a classe do elemento filho se existir
  let className = "";
  if (React.isValidElement(children) && children.props) {
    className = (children.props as { className?: string }).className || "";
  }

  return (
    <span 
        style={{ 
            opacity, 
            textShadow: isCurrent ? "0 0 5px black" : "", 
            color: isCurrent? "white" : ""
        }}
        onClick={() => onWordClick?.(index)}
        >
      {children}
    </span>
  );
}

/**
 * Componente principal que aplica animações de revelação ao rolar a página.
 */
export default function ScrollReveal({ 
    children, 
    className, 
    activeIndex, 
    onIndexChange,
    ...props }: ScrollRevealProps) {
  const flat = flatten(children);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "dark:text-zinc-900",
        className,
      )}
    >
      <div>
        <div>
          {flat.map((child, index) => (
            <OpacityChild
              progress={activeIndex}
              index={index}
              total={flat.length}
              key={index}
              onWordClick={onIndexChange}
            >
              {child}
            </OpacityChild>
          ))}
        </div>
      </div>
    </div>
  );
}
