export default class Theme {

  //Using this you can change the background color for the application.(Any valid color name or hex color is applicable.)
  private static backgroundColor : string = '#e5e5e5'

  //This enables and disables darkMode for the application.
  //**Pls note DO NOT SET BACKGROUND COLOR AND ENABLE DARK MODE.
  //**IF DONE THE BACKGROUND COLOR WILL OVERRIDE THE DARK MODE.
  private static darkMode : boolean = false;

  //  The available color options are
  // emerald, green, lime ,red ,orange ,amber , yellow ,
  // teal ,cyan ,sky ,blue ,indigo ,violet, purple, fuchsia,
  // pink ,rose ,slate ,gray ,zinc ,neutral ,stone.

  private static primaryColor: string = 'blue'
  private static secondaryColor: string = 'green'
  private static surfaceColor: string = 'indigo'
  private static accentColor: string = 'red'

  public static getVisiualMode() : boolean {
    return this.darkMode
  }

  //This sets the background for the entire app.
  public static getBackgroundColor(): string {
    return this.backgroundColor
  }

  //This sets the Main / Primary color for all the primeView components throughout the app.
  public static getPrimaryColor(): string {
    return this.primaryColor
  }

  //This sets the Secondary color for all the primeView components throughout the app.
  public static getSecondaryColor(): string {
    return this.secondaryColor
  }

  //This sets the Surface and background color for many different backgrounds of components.
  public static getSurfaceColor(): string {
    return this.surfaceColor
  }
  //This sets the Accent color for all the primeView components throughout the app.
  public static getAccentColor(): string {
    return this.accentColor
  }
}
