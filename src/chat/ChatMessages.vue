<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
      <!-- :its-mine="message.itsMine"
        :message="message.message"
        :image="message.image" -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ChatBubble from './ChatBubble.vue';
import type { ChatMessage } from '@/interfaces/chat-message.interface';

interface Props {
  messages: ChatMessage[];
}

const { messages } = defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

//WATCH ESCUCHA CAMBIOS EN UNA VARIALE REACTIVA
//PARAMETROS: LO QUE ESCUCHARA, LO QUE HARA CUANDO CAMBIE, SETTINGS
watch(
  () => messages,
  () => {
    setTimeout(() => {
      if (chatRef.value) {
        chatRef.value.scrollTo({
          top: chatRef.value.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  },
  { deep: true },
);
</script>
