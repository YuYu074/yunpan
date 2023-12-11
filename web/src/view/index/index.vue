<template>
  <input type="button" value="发送请求" id="btn" @click="postMessage"/>
</template>

<script setup>
  import { ref } from 'vue'
  const postMessage = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/login/test", true);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    xhr.send('message=hello');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText, xhr.responseXML); // responseText获取字符串形式的响应数据  responseXML获取XML形式的响应数据
      }
    };
  };
</script>

<style>

</style>