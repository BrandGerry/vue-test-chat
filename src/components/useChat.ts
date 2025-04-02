import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';
import { sleep } from '@/helpers/sleep';
import { ref } from 'vue';

export const useChat = () => {
  // REF REACTIVO CAMBIA SU VALOR Y TIENE QUE TENER EL INTERFACE DE CHATMESSAGE
  const messages = ref<ChatMessage[]>([]);

  const getHerResponse = async () => {
    const resp = await fetch('https://yesno.wtf/api');
    const data = (await resp.json()) as YesNoResponse;
    return data;
  };

  const onMessage = async (text: string) => {
    //SI EL TEXTO ES 0 RETORNA NADA
    if (text.length === 0) return;
    await sleep(1.5);
    //INSERTA EL UN NUEVO MSJ CON EL TEXTO DE MI MENSAJE
    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text,
    });
    //SI MI MENSAJE NO TERMINA CON SIGNO TERMINA AHI
    if (!text.endsWith('?')) return;
    //SI NO HACE LA RESPUESTA
    const { answer, image } = await getHerResponse();
    messages.value.push({
      id: new Date().getTime(),
      itsMine: false,
      message: answer,
      image: image,
    });
  };
  return {
    //PROPERTIES
    messages,
    //METODOS
    onMessage,
  };
};
