<template>
  <div class="aboutpage-container">
    <AstraSpace></AstraSpace>
    <div class="about-wrapper">
      <div class="about-content">
        <div class="astra-logo">
          <ShootingStar strokeColor="#fff"></ShootingStar>
        </div>
        <h2>{{ $t('about.text.title') }}</h2>
        <h4>{{ $t('about.text.desc') }}</h4>
        <p>{{ $t('about.text.content') }}</p>
        <div class="astra-tagline">
          {{ $t('about.text.tagline') }}
        </div>
      </div>
    </div>
    <div class="aboutpage-footer">
      <AstraButton
        type="nav"
        href="https://github.com/RoseBud13/Project-Asteroid"
        style="font-size: 20px"
        title="Project Asteroid"
      >
        <IconGithub></IconGithub>
      </AstraButton>
      <div>ver {{ getLocalConfig('version') }}</div>
      <div>By 🍒 with &hearts;</div>
    </div>
  </div>
</template>

<script setup>
import AstraSpace from '@/components/background/space.vue';
import ShootingStar from '@/components/icons/IconShootingStar.vue';
import IconGithub from '@/components/icons/IconGithub.vue';
import AstraButton from '@/components/basics/button/index.vue';
import useConfig from '@/config';

const { getLocalConfig } = useConfig();
</script>

<style>
.aboutpage-container {
  position: relative;
  width: 100%;
  height: var(--100vh);
  overflow-y: auto;
  overflow-x: hidden;
}

.about-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-content {
  position: relative;
  width: 80%;
  height: 80%;
  min-height: 600px;
  padding: 0 50px 130px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.about-content h1,
h2,
h3,
h4 {
  color: #fff;
  margin: 10px 0;
}

.about-content p {
  font-size: 15px;
  color: #fff;
  white-space: pre-line;
  line-height: 1.5rem;
  margin: 10px 0;
}

.astra-logo {
  font-size: 100px;
}

.astra-tagline {
  margin: 20px 10px;
  font-size: 20px;
  font-family: 'Gill Sans', sans-serif;
  color: #fff;
}

.aboutpage-footer {
  position: fixed;
  bottom: 0;
  padding-bottom: 10px;
  width: 100%;
  min-height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
}

@media (max-width: 600px) {
  .about-content {
    width: 100%;
  }
}
</style>
