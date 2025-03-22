import localFont from "next/font/local";

const clashDisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/ClashDisplay/ClashDisplay-Extralight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ClashDisplay/ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ClashDisplay/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ClashDisplay/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },

    {
      path: "../../../public/fonts/ClashDisplay/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },

    {
      path: "../../../public/fonts/ClashDisplay/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const harmoniaSansProCyr = localFont({
  src: [
    {
      path: "../../../public/fonts/HarmoniaSansProCyr/HarmoniaSansProCyr-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HarmoniaSansProCyr/HarmoniaSansProCyr-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HarmoniaSansProCyr/HarmoniaSansProCyr-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HarmoniaSansProCyr/HarmoniaSansProCyr-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/HarmoniaSansProCyr/HarmoniaSansProCyr-Black.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-harmonia-sans-pro-cyr",
  display: "swap",
});

// Remove quotes to avoid hydration error.
const clashDisplayFontFamily = clashDisplay.style.fontFamily.replaceAll(
  "'",
  ""
);

// Remove quotes to avoid hydration error.
const harmoniaSansProCyrFontFamily =
  harmoniaSansProCyr.style.fontFamily.replaceAll("'", "");

interface Props {}

const FontsLoader: React.FC<Props> = () => {
  return (
    <style>
      {`
            :root {
              --font-clash-display: ${clashDisplayFontFamily};
              --font-harmonia-sans-pro-cyr: ${harmoniaSansProCyrFontFamily};
            }
          `}
    </style>
  );
};

export default FontsLoader;
