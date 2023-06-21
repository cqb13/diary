<template>
  <hero class="flex flex-1 flex-col gap-5">
    <header
      class="flex scale-100 flex-col justify-center rounded-[60px] border border-primary p-10"
    >
      <h1
        class="scale-y-150 text-center font-serif text-15xl uppercase tracking-tighter text-primary max-xl:text-12xl max-xml:p-14 max-xml:text-10xl max-lg:p-5 max-mdl:p-0 max-mdl:text-9xl max-xsl:text-8xl max-xs:text-7xl"
      >
        diary
      </h1>
    </header>
    <section class="flex h-[600px] flex-col gap-2 text-dark-text">
      <div class="flex h-4/6 gap-2 max-sm:flex-col">
        <div
          class="flex h-full w-4/6 flex-col justify-end rounded-[60px] rounded-tr-none bg-white p-20 max-md:justify-center max-sm:w-full max-sm:rounded-tr-[60px]"
        >
          <hr class="h-0.5 w-1/5 border-0 bg-dark-text max-md:hidden"/>
          <p class="text-xl">
            Unleash your inner thoughts and emotions in a secure and private
            space, tailored just for you. Welcome to to My Online Diary, where
            self-reflection and self-discovery flourish.
          </p>
        </div>
        <div class="w-2/6 max-sm:hidden">
          <img
            src="../assets/aesthetic-img-1.jpg"
            alt="aesthetic img 1"
            class="object-fit h-full w-full rounded-[200px] rounded-br-none rounded-tl-none grayscale rendering-auto"
          />
        </div>
      </div>
      <div class="flex h-2/6 gap-2">
        <div class="w-2/6 max-sm:w-4/6">
          <img
            src="../assets/aesthetic-img-2.jpg"
            alt="aesthetic img 2"
            class="object-fit h-full w-full rounded-[60px] rounded-bl-none object-center grayscale"
          />
        </div>
        <div
          class="flex w-4/6 items-center justify-center rounded-[60px] bg-white max-sm:w-2/6"
        >
          <img src="../assets/star.svg" alt="star" class="h-1/2 w-1/2" />
        </div>
      </div>
    </section>
  </hero>
  <main class="mt-40">
    <section
      class="grid-auto-rows-min-content min-h-min-content relative grid w-full max-w-[1000px] flex-auto grid-cols-2 justify-center gap-5 overflow-visible p-0"
    >
      <div
        class="min-h-min-content z-1 relative col-span-2 flex w-full flex-auto transform flex-col items-start gap-10 self-center overflow-hidden rounded-[40px] bg-light-background p-10"
      >
        <div>
          <h3 class="font-serif text-4xl text-primary">Secure</h3>
          <p>Your privacy is our priority</p>
        </div>
        <img
          src="../assets/aesthetic-img-3.jpg"
          alt="aesthetic img 3"
          class="pointer-events-none block h-80 w-full rounded-lg object-cover object-center grayscale rendering-auto max-mds:h-52"
        />
      </div>
      <div class="flex flex-col gap-10 rounded-[40px] bg-light-background p-10 max-mds:relative max-mds:col-span-2">
        <div>
          <h3 class="font-serif text-4xl text-primary">Customizable</h3>
          <p>Personalize your diary</p>
        </div>
        <img
          src="../assets/aesthetic-img-4.jpg" 
          alt="aesthetic img 4"
          class="pointer-events-none block h-52 w-full rounded-lg rounded-tl-[40px] object-cover object-center grayscale rendering-auto max-mds:rounded-tl-lg"
        />
      </div>
      <div class="flex flex-col gap-10 rounded-[40px] bg-light-background p-10 max-mds:relative max-mds:col-span-2">
        <div>
          <h3 class="font-serif text-4xl text-primary">Accessible</h3>
          <p>Access anytime, anywhere</p>
        </div>
        <img
          src="../assets/aesthetic-img-5.jpg"
          alt="aesthetic img 5"
          class="pointer-events-none block h-52 w-full rounded-lg rounded-tr-[40px] object-cover object-center grayscale rendering-auto max-mds:rounded-tr-lg"
        />
      </div>
    </section>
    <section class="flex flex-col items-center gap-10 p-40 px-20 text-center max-md:py-32 max-md:px-0">
      <h1 class="font-serif text-5xl text-primary">Embrace Self-Reflection</h1>
      <p class="w-5/6 text-primary">
        Why wait for tomorrow? Start your self-discovery journey today using our
        intuitive online platform! Click the button below to sign up.
      </p>
      <router-link
        to="/register"
        class="rounded-lg bg-black p-2 tracking-wide transition-all hover:text-primary active:tracking-widest"
        >Join Now</router-link
      >
    </section>
    <section></section>
    <section>
      <h1 class="mb-10 font-serif text-5xl">Common Questions</h1>
      <div class="flex gap-20 max-sm:flex-col max-sm:gap-10">
        <div>
          <h3 class="mb-2 text-lg font-semibold">
            Is my diary content secure and private?
          </h3>
          <p>
            Absolutely! At My Online Diary, we implement state-of-the-art
            security measures to protect your content, ensuring complete privacy
            and confidentiality.
          </p>
        </div>
        <div>
          <h3 class="mb-2 text-lg font-semibold">
            Can I access my diary on multiple devices?
          </h3>
          <p>
            Yes! My Online Diary is accessible across devices to provide
            flexibility in recording your thoughts anytime, anywhere.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
