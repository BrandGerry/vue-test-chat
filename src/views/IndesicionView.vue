<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Mi esposa</span>
    </div>
    <ChatMessages :messages="messages" />
    <MessageBox @send-message="onMessage" />
  </div>
</template>

<script setup lang="ts">
// COMPONENTES
import ChatMessages from '../chat/ChatMessages.vue';
import MessageBox from '../chat/MessageBox.vue';
// COMPOSABLE
import { useChat } from '@/components/useChat';
const { messages, onMessage } = useChat();
</script>
