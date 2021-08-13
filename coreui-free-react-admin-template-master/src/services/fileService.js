import{ AppConfiguration } from "read-appsettings-json";
export const URL_DescriptionFiles= (`${AppConfiguration.Setting().apiendpoint}/descriptionfiles`)
export const URL_File= (`${AppConfiguration.Setting().apiendpoint}/file`)