<template>
  <hero class="flex flex-1 flex-col gap-5">
    <header
      class="align-center flex flex-col justify-center rounded-[60px] border border-primary p-10"
    >
      <h1
        class="text-center font-serifs text-[20rem] tracking-tighter text-primary"
      >
        DIARY
      </h1>
    </header>
    <section class="flex h-[600px] flex-col gap-2 text-dark-text">
      <div class="flex h-4/6 gap-2">
        <div class="h-full w-4/6 rounded-[60px] rounded-tr-none bg-white p-20 flex flex-col justify-end">
          <hr class="h-0.5 w-1/5 border-0 bg-dark-text" />
          <p class="text-xl">
            Unleash your inner thoughts and emotions in a secure and private
            space, tailored just for you. Welcome to to My Online Diary, where
            self-reflection and self-discovery flourish.
          </p>
        </div>
        <div class="w-2/6">
          <img
            src="../assets/aesthetic-img-1.jpg"
            alt="aesthetic img 1"
            class="object-fit h-full w-full rounded-[200px] rounded-br-none rounded-tl-none grayscale rendering-auto"
          />
        </div>
      </div>
      <div class="flex h-2/6 gap-2">
        <div class="w-2/6">
          <img
            src="../assets/aesthetic-img-2.jpg"
            alt="aesthetic img 2"
            class="object-fit h-full w-full rounded-[60px] rounded-bl-none object-center grayscale"
          />
        </div>
        <div
          class="flex w-4/6 items-center justify-center rounded-[60px] bg-white"
        >
          <img src="../assets/star.svg" alt="star" class="h-1/2 w-1/2" />
        </div>
      </div>
    </section>
  </hero>
  <main class="mt-40">
    <section
      class="grid-auto-rows-min-content min-h-min-content relative grid w-full max-w-[1000px] flex-auto grid-cols-2 justify-center gap-5 overflow-visible px-0 py-0"
    >
      <div
        class="min-h-min-content z-1 relative col-span-2 flex w-full flex-auto transform flex-col items-start gap-10 self-center overflow-hidden rounded-[40px] bg-light-background p-10"
      >
        <div>
          <h3 class="font-serifs text-4xl text-primary">Secure</h3>
          <p>Your privacy is our priority</p>
        </div>
        <img
          src="../assets/aesthetic-img-3.jpg"
          alt="aesthetic img 3"
          class="pointer-events-none block h-80 w-full rounded-lg object-cover object-center grayscale rendering-auto"
        />
      </div>
      <div class="flex flex-col gap-10 rounded-[40px] bg-light-background p-10">
        <div>
          <h3 class="font-serifs text-4xl text-primary">Customizable</h3>
          <p>Personalize your diary</p>
        </div>
        <img
          src="../assets/aesthetic-img-4.jpg"
          alt="aesthetic img 4"
          class="pointer-events-none block h-52 w-full rounded-lg rounded-tl-[40px] object-cover object-center grayscale rendering-auto"
        />
      </div>
      <div class="flex flex-col gap-10 rounded-[40px] bg-light-background p-10">
        <div>
          <h3 class="font-serifs text-4xl text-primary">Accessible</h3>
          <p>Access anytime, anywhere</p>
        </div>
        <img
          src="../assets/aesthetic-img-5.jpg"
          alt="aesthetic img 5"
          class="pointer-events-none block h-52 w-full rounded-lg rounded-tr-[40px] object-cover object-center grayscale rendering-auto"
        />
      </div>
    </section>
    <section>
      
    </section>
    <section></section>
    <section></section>
  </main>
</template>
