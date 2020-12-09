<template>
    <div>
        <mt-field type="text" label="用户名" :attr="{maxlength:'12'}" state="success" disableClear placeholder="请输入您的用户名"></mt-field>
        <mt-field type="password" label="密码" :attr="{maxlength:'12',autocomplete:'off'} " state="warning" placeholder="请输入您的密码"></mt-field>
        <mt-field type="password" label="确认密码" :attr="{maxlength:'12',autocomplete:'off'} " state="error" placeholder="请再次输入密码"></mt-field>

    </div>
</template>