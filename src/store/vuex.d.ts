// vuex.d.ts
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    id: number;
    question: string;
    description: undefined | null;
    category: string;
    answers: {
      answer_a: string;
      answer_b: string;
      answer_c: string;
      answer_d: string;
      answer_e?: string;
      answer_f?: string;
    };
    multiple_correct_answers: string;
    difficulty: string;
  }[]


  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<States>
  }
}