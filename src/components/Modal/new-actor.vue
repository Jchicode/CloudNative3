<script setup lang="ts">
import { reactive, ref } from "vue";
import { loadData } from "@/utils/shared";

type FormData = {
  name: string;
  version: string;
  oci: string;
  capabilities: string;
};

const form: FormData = reactive({
  name: "",
  version: "",
  oci: "",
  capabilities: ""
});
const loading = ref(false);
const result = reactive({});
const handleSubmit = () => {
  loadData(result, "cod.market.actoradd", form, loading, () => {
    window.location.reload();
  });
};
</script>
<template>
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="new-actor-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <label
        for="new-actor-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >

      <div class="flex items-center">
        <IconifyIconOnline
          class="mr-2"
          icon="simple-icons:wasmer"
          width="25px"
          height="25px"
        />
        <h3>New Actor</h3>
      </div>

      <div class="form-control w-full mt-5">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          v-model="form.name"
          class="input input-primary w-full"
        />

        <label class="label mt-2">
          <span class="label-text">Version</span>
        </label>
        <input
          type="text"
          v-model="form.version"
          placeholder="Type here"
          class="input input-primary w-full"
        />

        <label class="label mt-2">
          <span class="label-text">OCI</span>
        </label>
        <input
          type="text"
          v-model="form.oci"
          placeholder="Type here"
          class="input input-primary w-full"
        />

        <label class="label mt-2">
          <span class="label-text">Capabilities</span>
        </label>
        <textarea
          v-model="form.capabilities"
          placeholder='["cap1", "cap2"]'
          class="textarea textarea-primary w-full"
        />
      </div>

      <div class="mt-5" />
      <progress v-if="loading" class="progress progress-primary" />
      <button v-else class="btn btn-primary w-full" @click="handleSubmit">
        Submit
      </button>
    </div>
  </div>
</template>
