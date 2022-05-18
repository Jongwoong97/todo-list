import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    secondBgColor: string;
    accentColor: string;
    textTileColor: string;
    toDoTileColor: string;
    doingTileColor: string;
    doneTileColor: string;
  }
}
