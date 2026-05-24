import { useEffect } from "react";

const SELECTOR = "[data-animate], [data-animate-left]";

function setStaggerIndex(el: HTMLElement) {
  const siblings = el.parentElement?.querySelectorAll(SELECTOR);
  const localIndex = siblings ? Array.from(siblings).indexOf(el) : 0;
  el.style.setProperty("--i", String(localIndex));
}

export function useScrollAnimate(deps: unknown[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const observeElement = (el: HTMLElement) => {
      if (el.classList.contains("visible")) return;
      setStaggerIndex(el);
      observer.observe(el);
    };

    const registerElement = (el: HTMLElement) => {
      el.classList.remove("visible");
      observeElement(el);
    };

    const registerTree = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(SELECTOR)) {
        registerElement(root);
      }
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach(registerElement);
    };

    registerTree(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            registerTree(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, deps);
}
