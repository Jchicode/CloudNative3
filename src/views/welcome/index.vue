<script setup lang="ts">
import { useRouter } from "vue-router";
import { welcome } from "@/config/welcome";

// import gaIcon from "@/assets/welcome/ga.svg?url";
// import cbIcon from "@/assets/welcome/cb.svg?url";
import wfIcon from "@/assets/welcome/wf.svg?url";
// import starterIcon from "@/assets/welcome/starter.svg?url";
// import weechainIcon from "@/assets/welcome/weechain.svg?url";
// import fevmIcon from "@/assets/welcome/fevm-1.svg?url";
import fvmPng from "@/assets/welcome/fvm.png";
import chainlinkPng from "@/assets/welcome/chainlink.png";
// import nostrPng from "@/assets/welcome/nostr.png";
import nostrJpg from "@/assets/welcome/nostr.jpg";

import bg from "./bg.jpg";

defineOptions({
  name: "Welcome"
});

const router = useRouter();

const icons = [
  fvmPng,
  chainlinkPng,
  nostrJpg,
  // fevmIcon,
  // gaIcon,
  // starterIcon,
  // cbIcon,
  // weechainIcon,
  wfIcon
];

const arr = [
  "Cloud Native Oracles",
  "Application Digital Identity",
  "Computing Over Function",
  "Cloud Native Infrastructure Security"
];
</script>

<template>
  <div class="text-center">
    <h1 class="text-5xl font-bold mt-[120px] dark:text-slate-200">
      {{ welcome.title }}
    </h1>
    <p
      class="py-6 text-xl max-w-[700px] mx-auto text-slate-500 dark:text-slate-400"
    >
      {{ welcome.description }}
    </p>

    <p
      v-if="0"
      class="text-xl max-w-[700px] mx-auto text-slate-500 dark:text-slate-400 flex items-center"
    >
      <span class="ml-10">Things we build, including </span>
      <VueWriter
        class="font-bold text-primary ml-1"
        :array="arr"
        :typeSpeed="40"
        :eraseSpeed="1"
      />
    </p>

    <button class="btn btn-primary mt-10" @click="router.push('container')">
      Get Started
    </button>

    <div>
      <p
        class="text-center text-slate-700 dark:text-slate-400 text-xs mt-14 uppercase"
      >
        Thanks for these techs, including
      </p>
      <div class="flex items-center justify-between max-w-2xl mx-auto mt-10">
        <img v-for="icon in icons" :src="icon" class="h-[35px]" />
      </div>
    </div>
  </div>
  <!-- section2 -->
  <div class="bg-base-200 mt-10 text-center py-20">
    <h1 class="text-2xl font-bold dark:text-slate-200">
      CloudNative3 System Architecture
    </h1>
    <p
      class="py-6 text-lg max-w-[700px] mx-auto text-slate-500 dark:text-slate-400"
    >
      CloudNative3 provides a complete solution, including technologies such as
      container cloud, service grid governance, zero-trust security control, and
      decentralized security control of on-chain oracles. At the same time, the
      communication proof mechanism based on TLSNotary can also ensure the
      security and reliability of communication.
    </p>

    <div>
      <img class="rounded-md shadow-2xl w-[500px] mx-auto" :src="bg" alt="" />
    </div>
  </div>
</template>
<style lang="scss">
.is-typed {
  // font-family: "Monaco";
}
.is-typed span.typed {
  colour: #5809f8;
}
.is-typed span.cursor {
  display: inline-block;
  width: 3px;
  background-color: #5809f8;
  animation: blink 1s infinite;
}
.is-typed span.underscore {
  display: inline-flex;
  width: 10px;
  height: 1px;
  align-items: flex-end;
  background-color: #5809f8;
  animation: blink 1s infinite;
}
.is-typed span.cursor.typing {
  animation: none;
}
@keyframes blink {
  49% {
    background-color: #5809f8;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}
</style>
