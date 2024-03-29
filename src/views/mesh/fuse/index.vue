<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted } from "vue";
import { loadData } from "@/utils/shared";
import bus from "@/utils/event-bus";
import MessageVerified from "@/components/MessageVerified.vue";

const data = reactive({
  services: [],
  disabled: true,
  page: 1,
  limit_num: 3
});
const loading = ref(false);

const loadMore = async () => {
  loadService();
};

const loadService = async () => {
  loading.value = true;
  loadData(
    data.services,
    "govern.fuse.list",
    {
      page: data.page,
      limit_num: data.limit_num
    },
    loading
  );
  data.page++;
};

bus.on("refreshServices", _ => {
  console.log("handle refreshServices");
  data.page = 1;
  data.services.length = 0;
  loadService();
});

onMounted(async () => {
  loadService();
});

onUnmounted(() => {
  bus.off("refreshServices");
});

const getFuseTypeText = type => {
  const map = {
    1: "Continuous error reaches threshold",
    2: "Error rate reaches threshold",
    3: "Continuous error or error rate reaches threshold",
    4: "Continuous error and error rate reach the threshold at the same time"
  };

  return map[type] || "";
};
</script>
<template>
  <h2>{{ $route.meta.title }}</h2>
  <label class="btn btn-primary mt-5" for="new-fuse-rule-modal">
    <IconifyIconOnline
      icon="material-symbols:add-circle"
      width="25px"
      height="25px"
      class="mr-2"
    />
    New Rule
  </label>
  <div class="grid grid-flow-row grid-cols-3 gap-4 mt-5">
    <div class="card col-span-1 shadow border" v-for="s in data.services">
      <MessageVerified
        :event="s.event"
        class="absolute right-[-10px] top-[-10px]"
      />
      <div class="card-body">
        <h2 class="card-title break-all text-primary text-md">
          {{ s.unique_id }}
        </h2>
        <div
          class="badge badge-primary text-xs"
          :class="s.is_open === 1 ? 'badge-prmary' : 'badge-secondary'"
        >
          {{ s.is_open === 1 ? "Enabled" : "Disabled" }}
        </div>

        <p class="text-sm font-semibold mt-5">Rule</p>
        <div class="leading-5 text-xs">
          <p class="mt-2 text-slate-500">Child Service:</p>
          <p class="break-all">{{ s.child_unique_id }}</p>
          <p class="mt-2 text-slate-500">Rule Type:</p>
          <p class="break-all">{{ getFuseTypeText(s.rule_type) }}</p>
          <p class="mt-2 text-slate-500">Target:</p>
          <p class="break-all">{{ s.target }}</p>
          <p class="mt-2 text-slate-500">Max Requests:</p>
          <p class="break-all">{{ s.max_requests }}</p>
          <p class="mt-2 text-slate-500">Interval:</p>
          <p class="break-all">{{ s.interval }}s</p>
          <p class="mt-2 text-slate-500">Error Percent:</p>
          <p class="break-all">{{ s.error_percent }}%</p>
          <p class="mt-2 text-slate-500">Serial Error Numbers:</p>
          <p class="break-all">{{ s.serial_error_numbers }}</p>
          <p class="mt-2 text-slate-500">Open Timeout:</p>
          <p class="break-all">{{ s.open_timeout }}s</p>
        </div>
      </div>
    </div>

    <div class="card shadow-md row-span-1 border">
      <div class="card-body">
        <progress v-if="loading" class="progress row-span-1" />

        <button class="btn w-full mt-10" :disabled="loading" @click="loadMore">
          <IconifyIconOnline
            class="mr-2"
            icon="material-symbols:add-circle"
            width="30px"
            height="30px"
          />Load More
        </button>
      </div>
    </div>
  </div>
</template>
