# Material Icons Usage

With the generated CSS imported into your `globals.css`, you can now use Material Icons anywhere in your app by simply adding the class and icon name.

## Basic Usage

```html
<span class="material-symbols-rounded">settings</span>
<span class="material-symbols-rounded">house</span>
<span class="material-symbols-rounded">water_drop</span>
```

## With Size Classes

```html
<span class="material-symbols-rounded size-16">settings</span>
<span class="material-symbols-rounded size-24">settings</span>
<span class="material-symbols-rounded size-32">settings</span>
<span class="material-symbols-rounded size-48">settings</span>
```

## With Fill Variants

```html
<!-- Outlined (default) -->
<span class="material-symbols-rounded outlined">star</span>

<!-- Filled -->
<span class="material-symbols-rounded filled">star</span>
```

## In React/JSX

```jsx
<span className="material-symbols-rounded">settings</span>
<span className="material-symbols-rounded size-32 filled">star</span>
```

## Available Icons (Auto-generated from CMS)

The following icons are currently available based on your CMS data:

- air
- approval_delegation
- architecture
- attach_money
- azm
- bath_private
- bolt
- cake
- check_box_outline_blank
- coffee
- computer
- crop_square
- eda
- elevation
- fence
- grass
- hearing
- house
- outdoor_garden
- paragliding
- person_celebrate
- person_play
- potted_plant
- privacy_tip
- rainy
- settings
- settings_suggest
- sports_martial_arts
- star
- thermometer_gain
- tools_power_drill
- toys_fan
- videogame_asset
- water
- water_drop
- water_full
- wb_sunny
- weather_hail
- weather_snowy
- work

## Build Process

The icons are automatically fetched from your CMS and the CSS is generated during the build process. To manually regenerate:

```bash
npm run generate-icons
```

This will:
1. Fetch the latest data from your CMS
2. Extract all unique icon names
3. Generate optimized CSS with only the icons you need
4. Update the `styles/material-icons.css` file
