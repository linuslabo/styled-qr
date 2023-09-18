<template>
  <header class="p-4">
    <h1 class="text-2xl font-bold">Yet Another QrCode Generator</h1>
    <h2 class="text-lg">NO TRACKERS | NO REDIRECTIONS | NO EXPIRATIONS</h2>
  </header>
  <main class="md:flex p-4 items-start">

    <div>
      <form id="configForm" class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow">

        <div class="sm:col-span-6">
          <label for="url">URL</label>
          <div class="mt-2">
            <input type="text" v-model="options.data" name="url" id="url"/>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label for="width">Size (px)</label>
          <div class="mt-2">
            <input type="number" v-model="options.width" name="width" id="width"/>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label for="margin">Margin</label>
          <div class="mt-2">
            <input type="number" v-model="options.margin" name="margin" id="margin"/>
          </div>
        </div>


        <div class="col-span-full"></div>
      </form>

      <h2 class="text-2xl font-medium mt-4">Dots style</h2>
      <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow"><!--   DOTS   -->
        <div class="sm:col-span-2">
          <!--        <label for="ext" class="block text-sm font-medium leading-6 text-gray-900">Dots style</label>-->
          <select id="ext" v-model="options.dotsOptions.type"
                  class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="rounded">rounded</option>
            <option value="dots">dots</option>
            <option value="classy">classy</option>
            <option value="classy-rounded">classy-rounded</option>
            <option value="square">square</option>
            <option value="extra-rounded">extra-rounded</option>
          </select>
        </div>
        <!--        <div class="sm:col-span-2">-->
        <!--          <SwitchGroup as="div" class="flex items-center">-->
        <!--            <Switch v-model="enableGradient"-->
        <!--                    :class="[enableGradient ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">-->
        <!--            <span aria-hidden="true"-->
        <!--                  :class="[enableGradient ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"/>-->
        <!--            </Switch>-->
        <!--            <SwitchLabel as="span" class="ml-3 text-sm">-->
        <!--              <span class="font-medium text-gray-900">Gradiente</span>-->
        <!--              {{ ' ' }}-->
        <!--              &lt;!&ndash;            <span class="text-gray-500">(Save 10%)</span>&ndash;&gt;-->
        <!--            </SwitchLabel>-->
        <!--          </SwitchGroup>-->
        <!--        </div>-->
        <div class="sm:col-span-2">
          <!--          <label for="margin">Color</label>-->
          <div class="">
            <input type="color" v-model="options.dotsOptions.color" name="color" id="color"/>
          </div>
        </div>
      </form>

      <h2 class="text-2xl font-medium mt-4">Cornice degli angoli</h2>
      <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow"><!--   DOTS   -->
        <div class="sm:col-span-2">
          <select id="ext" v-model="options.cornersSquareOptions.type"
                  class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="dot">dot</option>
            <option value="square">square</option>
            <option value="extra-rounded">extra-rounded</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <div class="">
            <input type="color" v-model="options.cornersSquareOptions.color" name="color" id="color"/>
          </div>
        </div>
      </form>

      <h2 class="text-2xl font-medium mt-4">Pallini degli angoli</h2>
      <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow"><!--   DOTS   -->
        <div class="sm:col-span-2">
          <select id="ext" v-model="options.cornersDotOptions.type"
                  class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="dot">dot</option>
            <option value="square">square</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <div class="">
            <input type="color" v-model="options.cornersDotOptions.color" name="color" id="color"/>
          </div>
        </div>
      </form>

      <h2 class="text-2xl font-medium mt-4">Immagine</h2>
      <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow"><!--   DOTS   -->
        <div class="sm:col-span-6">
          <label for="imgSize">Size</label>
          <div class="">
            <input v-model="options.imageOptions.imageSize" type="range" id="imgSize" name="imgSize" min="0" max="0.5"
                   step="0.1"/>
          </div>
        </div>
        <div class="sm:col-span-1">
          <label for="imgMargin">Margin</label>
          <div class="">
            <input type="number" v-model="options.imageOptions.margin" name="imgMargin" id="imgMargin"/>
          </div>
        </div>
      </form>

      <Disclosure as="div" class="pt-6" v-slot="{ open }">
        <dt>
          <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
            <span class="text-base font-semibold leading-7">Opzioni avanzate</span>
            <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true"/>
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true"/>
                </span>
          </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" class="mt-2 pr-12 bg-gray-50 rounded-xl p-4 w-full">
          <div class="text-base leading-7 text-gray-600 ">
            <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow">
              <div class="sm:col-span-2">
                <label for="qrType">QR Type</label>
                <div class="mt-2">
                  <input type="number" v-model="options.qrOptions.typeNumber" min="0" max="40" step="1" name="qrType"
                         id="qrType"/>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="qrMode">Mode</label>
                <select id="qrMode" v-model="options.qrOptions.mode"
                        class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="Numeric">Numeric</option>
                  <option value="Alphanumeric">Alphanumeric</option>
                  <option value="Byte">Byte</option>
                  <option value="Kanji">Kanji</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label for="qrMode">Error correction</label>
                <select id="correctionLevel" v-model="options.qrOptions.errorCorrectionLevel"
                        class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="Q">Q</option>
                  <option value="H">H</option>
                </select>
              </div>
            </form>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>


    <section id="result" class="p-4 max-w-xs flex flex-col place-content-center mx-auto flex-shrink-0">
      <div ref="qrCode" class="resultWrapper  w-full">
      </div>

      <div id="downloadSection" class="mt-4 flex flex-col sm:flex-row flex-nowrap items-end gap-2">
        <div class="flex-grow w-full">
          <label for="ext" class="block text-sm font-medium leading-6 text-gray-900">Estensione</label>
          <select id="ext" v-model="extension"
                  class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
        <div class=" w-full">
          <button type="button" v-on:click="download"
                  class="w-full rounded-md bg-indigo-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Download
          </button>
        </div>
      </div>

    </section>

  </main>
</template>

<!--suppress JSSuspiciousNameCombination -->
<script setup lang="ts">
import '@/assets/main.css'
import QRCodeStyling from 'qr-code-styling';
import type {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  FileExtension
} from 'qr-code-styling';
import {onMounted, ref, watch} from "vue";
import {MinusSmallIcon, PlusSmallIcon} from '@heroicons/vue/24/outline'
// import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'


const qrCode = ref();
const extension = ref('svg');
const advancedOpen = ref(false);
// const enableGradient = ref(false);
const options = ref({
  width: 300,
  height: 300,
  type: 'canvas' as DrawType,
  data: 'http://qr-code-stylinsg.com',
  image: '/favicon.ico',
  margin: 10,
  qrOptions: {
    typeNumber: 0 as TypeNumber,
    mode: 'Byte' as Mode,
    errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 10,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    color: '#41b583',
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#1111c5' }]
    // },
    type: 'rounded' as DotType
  },
  backgroundOptions: {
    color: '#ffffff',
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
    // },
  },
  cornersSquareOptions: {
    color: '#35495E',
    type: 'extra-rounded' as CornerSquareType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
    // },
  },
  cornersDotOptions: {
    color: '#35495E',
    type: 'dot' as CornerDotType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
    // },
  }
});

const renderedCode = ref(new QRCodeStyling(options.value))
const download = () => {
  renderedCode.value.download({extension: extension.value as FileExtension})
}


onMounted(() => {
  renderedCode.value.append(qrCode.value)
})

watch(options.value, async (newOptions) => {
  options.value.height = options.value.width;
  console.log('options changed', newOptions)
  renderedCode.value.update(newOptions)
});

</script>

<style scoped lang="postcss">
form label {
  @apply block text-sm font-medium leading-6 text-gray-900;
}

form input:not([type="range"]):not([type="color"]) {
  @apply block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6;
}
form input[type="color"] {
  @apply p-0 m-0;
}
</style>
