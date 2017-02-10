<template>
    <div class="weui-tabbar">
        <router-link to="/disk" class="weui-tabbar__item">
            <img src="/static/img/disk.png" alt="" class="weui-tabbar__icon">
            <p class="weui-tabbar__label">网盘</p>
        </router-link>
        <router-link to="/task" class="weui-tabbar__item">
            <img src="/static/img/task.png" alt="" class="weui-tabbar__icon">
            <p class="weui-tabbar__label">任务</p>
        </router-link>
        <router-link to="/user" class="weui-tabbar__item">
            <img src="/static/img/user.png" alt="" class="weui-tabbar__icon">
            <p class="weui-tabbar__label">账户</p>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>
