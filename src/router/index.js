import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import infor from '@/components/infor'
import application from '@/components/application'
import mytask from '@/components/mytask'
import agenttask from '@/components/mytask/check'
import taskalready from '@/components/mytask/taskalready'
import mydata from '@/components/mydata'
import owndata from '@/components/myData/owndata'
import appdata from '@/components/myData/appdata'
import downloadmanagement from '@/components/myData/downloadmanagement'
import directorymanagement from '@/components/myData/directorymanagement'
import dataupload from '@/components/myData/dataupload'
import placeNameAddress from '@/components/myData/placeNameAddress'
import dataconf from '@/components/myData/dataconf2'
import Owndata1 from '@/components/Owndata1'
import Owndata2 from '@/components/Owndata2'
import Owndata3 from '@/components/Owndata3'
import Owndata4 from '@/components/Owndata4'
import Owndata5 from '@/components/Owndata5'

import recyclebin from '@/components/recyclebin'
import mylog from '@/components/myLog/mylog'
import myservice from '@/components/service-head'
import applicationservice from '@/components/myService/myservice-application'
import registrationservice from '@/components/myService/myservice-registration'
import gimsservice from '@/components/myService/myservice-GIMS'
import news from '@/components/news-head'
import release from '@/components/release'
import demonstration from '@/components/demonstration'
import shuffling from '@/components/shuffling'
import column from '@/components/column'
import basic from '@/components/basic'

import Numone from '@/components/Numone'
import Numtwo from '@/components/Numtwo'
import Numthree from '@/components/Numthree'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/recycle',
      name: 'recyclebin',
      component: recyclebin
    },
    {
      path: '/mylog',
      name: 'mylog',
      component: mylog
    },
    {
      path: '/myservice',
      name: 'myservice',
      component: myservice,
      children: [
        {
          path: '/myservice/applicationservice',
          name: 'applicationservice',
          component: applicationservice
        },
        {
          path: '/myservice/registrationservice',
          name: 'registrationservice',
          component: registrationservice,
          children: [
            {
              path: '/myservice/registrationservice/Numone',
              name: 'Numone',
              component: Numone
            },
            {
              path: '/myservice/registrationservice/Numtwo',
              name: 'Numtwo',
              component: Numtwo
            },
            {
              path: '/myservice/registrationservice/Numthree',
              name: 'Numthree',
              component: Numthree
            }
          ]
        },
        {
          path: '/myservice/gimsservice',
          name: 'gimsservice',
          component: gimsservice
        }
      ]
    },
    {
      path: '/Newsmanagement',
      name: 'news',
      component: news,
      children: [
        {
          path: '/Newsmanagement/release',
          name: 'release',
          component: release
        },
        {
          path: '/Newsmanagement/demonstration',
          name: 'demonstration',
          component: demonstration
        },
        {
          path: '/Newsmanagement/shuffling',
          name: 'shuffling',
          component: shuffling
        },
        {
          path: '/Newsmanagement/column',
          name: 'column',
          component: column
        },
        {
          path: '/Newsmanagement/basic',
          name: 'basic',
          component: basic
        }
      ]
    },
    {
      path: '/infor',
      name: 'infor',
      component: infor
    },
    {
      path: '/application',
      name: 'application',
      component: application
    },
    {
      path: '/mytask',
      name: 'mytask',
      component: mytask,
      children: [
        {
          path: '/mytask/agenttask',
          name: 'agenttask',
          component: agenttask
        },
        {
          path: '/mytask/taskalready',
          name: 'taskalready',
          component: taskalready
        }
      ]
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: mydata,
      children: [
        {
          path: '/mydata/owndata',
          name: 'owndata',
          component: owndata,
          children: [
            {
              path: '/mydata/owndata/Owndata1',
              name: 'Owndata1',
              component: Owndata1
            },
            {
              path: '/mydata/owndata/Owndata2',
              name: 'Owndata2',
              component: Owndata2
            },
            {
              path: '/mydata/owndata/Owndata3',
              name: 'Owndata3',
              component: Owndata3
            },
            {
              path: '/mydata/owndata/Owndata4',
              name: 'Owndata4',
              component: Owndata4
            },
            {
              path: '/mydata/owndata/Owndata5',
              name: 'Owndata5',
              component: Owndata5
            }
          ]
        },
        {
          path: '/mydata/appdata',
          name: 'appdata',
          component: appdata
        },
        {
          path: '/mydata/downloadmanagement',
          name: 'downloadmanagement',
          component: downloadmanagement
        },
        {
          path: '/mydata/directorymanagement',
          name: 'directorymanagement',
          component: directorymanagement
        },
        {
          path: '/mydata/dataupload',
          name: 'dataupload',
          component: dataupload
        },
        {
          path: '/mydata/placeNameAddress',
          name: 'placeNameAddress',
          component: placeNameAddress
        },
        {
          path: '/mydata/dataconf',
          name: 'dataconf',
          component: dataconf
        }
      ]
    }
  ]
})
