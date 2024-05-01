import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
// import pages from './zh-CN/pages';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import mnt from './zh-CN/mnt/mnt';
import topImg from './zh-CN/mnt/top-img';
import category from './zh-CN/mnt/category';
import common from './zh-CN/common';
import booking from './zh-CN/mnt/booking';

export default { 
  // ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...mnt,
  ...topImg,
  ...category,
  ...common,
  ...booking,
};
