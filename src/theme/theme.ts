interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_32: 32,
  space_36: 36,
};

interface Color {
  Black: string;
  BlackRGB10: string;
  Orange: string;
  OrangeRGBA0: string;
  Grey: string;
  DarkGrey: string;
  Yellow: string;
  White: string;
  WhiteRGBA75: string;
  WhiteRGBA50: string;
  WhiteRGBA32: string;
  WhiteRGBA15: string;

  Primary: string;
  White1: string;
  White2: string;
  White3: string;
  Black1: string;
  Black2: string;
}

export const COLORS: Color = {
  Black: "#000000",
  BlackRGB10: "rgba(0,0,0,0.1)",
  Orange: "#FF5524",
  OrangeRGBA0: "rgba(255,85,36,0)",
  Grey: "#151515",
  DarkGrey: "#0b0b0b",
  Yellow: "#E1CD17",
  WhiteRGBA75: "rgba(255,255,255,0.75)",
  WhiteRGBA50: "rgba(255,255,255,0.50)",
  WhiteRGBA32: "rgba(255,255,255,0.32)",
  WhiteRGBA15: "rgba(255,255,255,0.15)",
  White: "#FFFFFF",

  Primary: "#7c74ee",
  White1: "#FFFFFF",
  White2: "#b3b3b3",
  White3: "#f5f5f5",
  Black1: "#121212",
  Black2: "#282828",
};

interface FontFamily {
  black: string;
  bold: string;
  extrabold: string;
  extralight: string;
  light: string;
  medium: string;
  regular: string;
  semibold: string;
  thin: string;
}

export const FONTFAMILY: FontFamily = {
  black: "Roboto-Black",
  bold: "Roboto-Bold",
  extrabold: "Roboto-ExtraBold",
  extralight: "Roboto-ExtraLight",
  light: "Roboto-Light",
  medium: "Roboto-Medium",
  regular: "Roboto-Regular",
  semibold: "Roboto-SemiBold",
  thin: "Roboto-Thin",
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};

interface Height {
  navigator: number;
}

export const HEIGHT: Height = {
  navigator: 70,
};

interface width {
  navigator: number;
}

export const WIDTH: width = {
  navigator: 70,
};
