import Vue from 'vue' // bus是基于vue的 把vue引入

export const eventBus = {} // 导出一个对象  对象用于存放标记
eventBus.bus = new Vue() // 实例化一个bus

eventBus.CHANGE_TABS = 'CHANGE_TABS' //  标记
eventBus.CHANGE_OPENER = 'CHANGE_OPENER' //  标记

eventBus.modalOK = 'modalOK'
