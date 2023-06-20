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
        <div class="h-full w-4/6 rounded-[60px] rounded-tr-none bg-white p-20">
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
            class=" h-full w-full rounded-[200px] rounded-br-none rounded-tl-none object-fit rendering-auto grayscale"
          />
        </div>
      </div>
      <div class="flex h-2/6 gap-2">
        <div class="w-2/6">
          <img src="../assets/aesthetic-img-2.jpg" alt="aesthetic img 2" class="object-fit object-center rounded-[60px] rounded-bl-none grayscale h-full w-full"/>
        </div>
        <div
          class="flex w-4/6 items-center justify-center rounded-[60px] bg-white"
        >
          <img src="../assets/star.svg" alt="star" class="h-1/2 w-1/2" />
        </div>
      </div>
    </section>
  </hero>
  <main>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
  </main>
</template>
