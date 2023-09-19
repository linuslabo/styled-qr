<template>
  <header class="p-4 md:p-6 lg:p-10 pb-0 md:pb-0 lg:pb-0">
    <h1 class="text-xl md:text-3xl font-medium flex items-center gap-2">Yet Another QrCode Generator
      <span class="mt-1 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">v2</span>
    </h1>
    <h2 class="text-gray-600">NO TRACKERS | NO REDIRECTIONS | NO EXPIRATIONS</h2>
  </header>

  <main class="md:flex p-4 md:p-6 lg:p-10 items-start md:gap-6 lg:gap-10">
    <div>
      <form id="configForm" class="grid grid-cols-6 gap-x-4 gap-y-2 flex-grow">

        <div class="col-span-6 sm:col-span-4">
          <label for="url">Content</label>
          <div class="">
            <input type="text" v-model="options.data" name="url" id="url"/>
          </div>
        </div>
        <div class="col-span-3 sm:col-span-1">
          <label for="width">Size (px)</label>
          <div class="">
            <input type="number" v-model="options.width" name="width" id="width"/>
          </div>
        </div>
        <div class="col-span-3 sm:col-span-1">
          <label for="margin">Margin</label>
          <div class="">
            <input type="number" v-model="options.margin" name="margin" id="margin"/>
          </div>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-x-4 gap-y-2 p-4 md:px-8 rounded-xl mt-4 border border-dashed border-three">
          <div class="col-span-6 sm:col-span-3">
            <label for="pic">Image</label>
            <div class="flex gap-1">
              <input type="file" @change="fileUpdated" name="pic" id="pic"/>
              <button @click="clearImage">
                <XCircleIcon class="w-7 h-7 text-gray-600 hover:text-gray-400"></XCircleIcon>
              </button>
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2 flex flex-col place-content-center items-center">
            <label for="imgSize">Size</label>
            <div>
              <input v-model="options.imageOptions.imageSize" type="range" id="imgSize" name="imgSize" min="0.1"
                     max="0.4" step="0.1"/>
            </div>
          </div>
          <div class="col-span-3  sm:col-span-1">
            <label for="imgMargin">Padding</label>
            <div class="">
              <input type="number" v-model="options.imageOptions.margin" name="imgMargin" id="imgMargin"/>
            </div>
          </div>
        </div>


        <div class="col-span-full"></div>
      </form>

      <div class="flex items-center gap-4 mt-10">
        <h3>
          Dots
        </h3>
        <input type="color" v-model="options.dotsOptions.color" name="color" id="color" class=""/>
      </div>
      <div class="flex gap-6">
        <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow">
          <div class="sm:col-span-6">
            <RadioGroup v-model="options.dotsOptions.type" class="mt-2">
              <RadioGroupLabel class="sr-only">Choose a memory option</RadioGroupLabel>
              <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <RadioGroupOption as="template" v-for="t in dotTypes" :key="t" :value="t" v-slot="{ active, checked }">
                  <div
                      :class="[t ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25', active ? 'ring-2 ring-one ring-offset-2' : '', checked ? 'ring-one ring-2 text-white' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900', 'flex items-center justify-center rounded-md py-3 px-3 text-sm sm:flex-1']">
                    <RadioGroupLabel as="span">
                      <div>
                        <img :src="'/img/dots/' + t + '.png'" :alt="t">
                      </div>
                    </RadioGroupLabel>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>

      <div class="flex items-center gap-4 mt-10">
        <h3>
          Corner square
        </h3>
        <input type="color" v-model="options.cornersSquareOptions.color" name="color" id="color" class=""/>
      </div>

      <div class="">
        <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow cornersSquareForm">
          <div class="sm:col-span-6">
            <RadioGroup v-model="options.cornersSquareOptions.type" class="mt-2">
              <RadioGroupLabel class="sr-only">Choose a memory option</RadioGroupLabel>
              <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <RadioGroupOption as="template" v-for="t in frameType" :key="t" :value="t" v-slot="{ active, checked }">
                  <div
                      :class="[t ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25', active ? 'ring-2 ring-one ring-offset-2' : '', checked ? 'ring-one ring-2 text-white' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900', 'flex items-center justify-center rounded-md py-3 px-3 text-sm sm:flex-1']">
                    <RadioGroupLabel as="span">
                      <div class="preview">
                        <img :src="'/img/frame/' + t + '.png'" :alt="t">
                      </div>
                    </RadioGroupLabel>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
          <div class="sm:col-span-6">
            <div class="">

            </div>
          </div>
        </form>
      </div>


      <div class="flex items-center gap-4 mt-10">
        <h3>
          Corner dot
        </h3>
        <input type="color" v-model="options.cornersDotOptions.color" name="color" id="color"/>
      </div>
      <form class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow cornersDotForm">
        <div class="sm:col-span-6">
          <RadioGroup v-model="options.cornersDotOptions.type" class="mt-2">
            <RadioGroupLabel class="sr-only">Choose a memory option</RadioGroupLabel>
            <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
              <RadioGroupOption as="template" v-for="t in cornerType" :key="t" :value="t" v-slot="{ active, checked }">
                <div
                    :class="[t ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25', active ? 'ring-2 ring-one ring-offset-2' : '', checked ? 'ring-one ring-2 text-white' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900', 'flex items-center justify-center rounded-md py-3 px-3 text-sm sm:flex-1']">
                  <RadioGroupLabel as="span">
                    <div class="preview">
                      <img :src="'/img/corner/' + t + '.png'" :alt="t">
                    </div>
                  </RadioGroupLabel>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>
      </form>

      <Disclosure as="div" class="p-6 bg-green-50 rounded-xl mt-10" v-slot="{ open }">
        <dt>
          <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
            <span class="text-base font-semibold leading-7">Opzioni avanzate</span>
            <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true"/>
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true"/>
                </span>
          </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" class="mt-2 w-full">
          <div class="text-base leading-7 text-gray-600 ">
            <form class="grid grid-cols-6 gap-x-4 gap-y-2 sm:grid-cols-6 flex-grow">
              <div class="col-span-2">
                <label for="qrType">QR Type</label>
                <div class="">
                  <input type="number" v-model="options.qrOptions.typeNumber" min="0" max="40" step="1" name="qrType"
                         id="qrType"/>
                </div>
              </div>
              <div class="col-span-2">
                <label for="qrMode">Mode</label>
                <select id="qrMode" v-model="options.qrOptions.mode"
                        class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-three sm:text-sm sm:leading-6">
                  <option value="Numeric">Numeric</option>
                  <option value="Alphanumeric">Alphanumeric</option>
                  <option value="Byte">Byte</option>
                  <option value="Kanji">Kanji</option>
                </select>
              </div>
              <div class="col-span-2">
                <label for="qrMode">ECL</label>
                <select id="correctionLevel" v-model="options.qrOptions.errorCorrectionLevel"
                        class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-three sm:text-sm sm:leading-6">
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


    <section id="result"
             class="flex flex-col place-content-center mx-auto flex-shrink-0 mt-6 md:mt-0 max-w-xs lg:max-w-sm">
      <div ref="qrCode" class="resultWrapper w-full"></div>

      <div id="downloadSection" class="mt-4 flex flex-col sm:flex-row flex-nowrap items-end gap-2">
        <div class="flex-grow w-full">
          <label for="ext" class="block text-sm font-medium leading-6 text-gray-900">Estensione</label>
          <select id="ext" v-model="extension"
                  class="mt-1 block w-full rounded-md border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-three sm:text-sm sm:leading-6">
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
        <div class=" w-full">
          <button type="button" v-on:click="download"
                  class="w-full rounded-md bg-two px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-three focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-two">
            Download
          </button>
        </div>
      </div>

    </section>

  </main>

  <footer class="mt-5 p-5 sm:p-10">
    <div>
      Made with
      <span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline-block text-red-600" viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </span>
      and in a hurry by <a href="https://github.com/linuslabo" class="hover:underline">linuslabo</a>.
    </div>
    <div class="text-gray-600">Qr Codes generated by the amazing <a href="https://github.com/kozakdenys/qr-code-styling"
                                                                    class="hover:underline">kozakdenys's
      qr-code-styling</a>.
    </div>
    <div class="mt-4">
      <span class="px-4 py-2 bg-yellow-50">Missing the old generator? You can find it <a href="https://qr-v1.cascone.net/" class="hover:underline">here!</a></span>
    </div>

  </footer>
</template>

<!--suppress JSSuspiciousNameCombination -->
<script setup lang="ts">
import '@/assets/main.css'
import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  FileExtension,
  Mode,
  TypeNumber
} from 'qr-code-styling';
import QRCodeStyling from 'qr-code-styling';
import {onMounted, ref, watch} from "vue";
import {MinusSmallIcon, PlusSmallIcon, XCircleIcon} from '@heroicons/vue/24/outline'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption
} from '@headlessui/vue'


const qrCode = ref();
const extension = ref('png');

const dotTypes = [
  "dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"
]

const frameType = [
  "square", "extra-rounded", "dot"
]

const cornerType = [
  "square", "dot"
]


const options = ref({
  width: 400,
  height: 400,
  type: 'canvas' as DrawType,
  data: 'https://qr.cascone.net',
  image: '',
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
    color: '#3B8C6E',
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
    color: '#164773',
    type: 'extra-rounded' as CornerSquareType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
    // },
  },
  cornersDotOptions: {
    color: '#164773',
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
  console.log('changed')
  options.value.height = options.value.width;
  renderedCode.value.update(newOptions)
});

const clearImage = () => {
  options.value.image = '';
}

const fileUpdated = (ev: any) => {
  if (!ev?.target?.files?.length) {
    options.value.image = '';
    return;
  }

  options.value.image = URL.createObjectURL(ev.target.files[0]);
}

</script>

<style scoped lang="postcss">
form label {
  @apply block text-sm font-medium leading-6 text-gray-900;
}

form input:not([type="range"]):not([type="color"]) {
  @apply bg-white block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-three sm:text-sm sm:leading-6;
}

form input[type="color"] {
  @apply p-0 m-0;
}

h2 {
  @apply text-xs md:text-xl font-medium;
}

h3 {
  @apply text-lg md:text-xl font-medium;
}

.preview img {
  width: 80px;
}
</style>
