// declare const $: (params: () => void) => void

interface IJquery {
  html: (dom: string) => IJquery
}

declare function $(readyFunc: () => void): void;
declare function $(selector: string): IJquery;
