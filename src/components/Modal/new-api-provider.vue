<script setup lang="ts">
import { reactive, ref } from "vue";
import { getDaoContract } from "@/utils/contract/dao";
import type { DAO } from "@/utils/contract/dao";
import { NFTStorage } from "nft.storage";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBEOGQ3MEI2MGZmYjBDODcwRGFBZDA4MTU1QWIxNmRDYjBFNDA3NjgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTMwNDA0OTU3MiwibmFtZSI6InN0YyJ9.jQu1V6HT58PB1pipWj7FVEkk0y7g_Ey2iY87i80KMHU";
const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });

type KV = {
  k: string;
  v: string;
};

const form: DAO = reactive({
  image: "",
  name: "",
  description: "",
  jsoninfo: ""
});

const configuration: Array<KV> = reactive([
  {
    k: "",
    v: ""
  }
]);

const loading = ref(false);
const handleSubmit = async () => {
  // prepare dao function params
  const map = {};
  configuration.forEach(c => {
    map[c.k] = c.v;
  });
  form.jsoninfo = window.btoa(JSON.stringify(map));
  loading.value = true;

  const contract = await getDaoContract();

  try {
    const transaction = await contract.createDao(
      form.name,
      form.description,
      form.jsoninfo,
      form.image
    );
    await transaction.wait();
    window.location.reload();
  } catch (e) {
    loading.value = false;
    window.alert(e.message);
  }
};

const imageData = ref("");
const uploadingNTF = ref(false);
const handleFileChange = async (e: Event) => {
  // @ts-ignore
  const file: File = e.target.files[0];

  const reader = new FileReader();
  reader.onload = function () {
    imageData.value = reader.result as string;
  };
  reader.readAsDataURL(file);

  uploadingNTF.value = true;
  const time = new Date().getTime();
  const metadata = await nftStorage.store({
    image: file,
    name: form.name || `name${time}`,
    description: form.description || `description${time}`
  });
  uploadingNTF.value = false;

  form.image = metadata.url;
};
</script>
<template>
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="new-api-provider-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <label
        for="new-api-provider-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >

      <div class="flex items-center">
        <IconifyIconOnline
          class="mr-2"
          icon="tabler:api-app"
          width="25px"
          height="25px"
        />
        <h3>New API Provider</h3>
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
          <span class="label-text">Description</span>
        </label>
        <input
          type="text"
          v-model="form.description"
          placeholder="Type here"
          class="input input-primary w-full"
        />

        <label class="label">
          <span class="label-text">Cover</span>
        </label>
        <div class="flex">
          <div class="avatar" v-if="imageData">
            <div class="w-24 rounded-md mr-2">
              <img :src="imageData" />
            </div>
          </div>
          <div>
            <input
              type="file"
              class="file-input file-input-bordered file-input-primary w-full flex-shrink"
              @change="handleFileChange"
            />
            <progress v-if="uploadingNTF" class="progress progress-info" />
            <p class="text-xs text-slate-500 break-all mt-2">
              {{ form.image }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-5" />
      <progress v-if="loading" class="progress progress-primary" />
      <button v-else class="btn btn-primary w-full" @click="handleSubmit">
        Submit
      </button>
    </div>
  </div>
</template>
