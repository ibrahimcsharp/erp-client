// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   //apiUrl: "http://192.168.2.173/api/",
   //fileUrl: 'http://192.168.2.173/',

   //IIS
  apiUrl: "http://localhost:60297/api/",
  fileUrl: "http://localhost:60297/",
  minioApiUrl: "http://192.168.2.37:8080/file-storage-service/",
  // minioApiUrl: "http://192.168.26.102:8081/hpos/api/",
  //END
  // Web_API
  // apiUrl: "http://localhost:5000/api/",
  // fileUrl: "http://localhost:60297/",
  //END
  //reportUrl:"https://localhost:44334/api/",
  apiMapUrl : "https://api.carcopolo.com/api/custom/v1/",
  apiMapUser : "st90@snowtex.org",
  apiMapPassword : "snowtex"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
