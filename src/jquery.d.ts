// declare const $: (params: () => void) => void
declare module 'jquery' {
  interface IJquery {
    html: (dom: string) => IJquery;
  }
  function $(readyFunc: () => void): void;
  function $(selector: string): IJquery;
  namespace $ {
    namespace fn {
      class init {}
    }
  }

  export = $;
}
