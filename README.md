# Cover tile card (homekit style)
Cover homekit tile lovelace card.
Can be used in combination with my homekit style card: https://github.com/DBuit/Homekit-panel-card


## Configuration

### Installation instructions

**HACS installation:**
Go to the hacs store and use the repo url `REPO URL HERE` and add this as a custom repository under settings.

Add the following to your ui-lovelace.yaml:
```yaml
resources:
  url: /community_plugin/plugin/cover-tile-card.js
  type: module
```

**Manual installation:**
Copy the .js file from the dist directory to your www directory and add the following to your ui-lovelace.yaml file:

```yaml
resources:
  url: /local/cover-tile-card.js
  type: module
```

### Main Options

| Name | Type | Default | Supported options | Description |
| -------------- | ----------- | ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity` | string | **Required** | `climate.nest` | Entity of the thermostat |
| `fullscreen` | boolean | optional| true | If false it will remove the pop-up wrapper which makes it fullscreen |
| `stepSize` | number | optional| 1 | If your climate gives a target_temp_step in the attributes this will be used, fallback is 1 if you don't set in in your configuration. |


Example configuration in lovelace-ui.yaml in combination with **Homekit panel card**:
```
  - title: "Home"
    panel: true
    cards:
      - type: "custom:homekit-card"
        entities:
          - title: Luxaflex
            entities:
              - card: custom:cover-tile-card
                cardOptions:
                  name: Rolluiken
                  entity: cover.rolluiken
                  states: 
                    - name: dicht
                      position: 0
                      icon: mdi:window-shutter
                    - name: gaatje
                      position: 15
                      icon: mdi:window-shutter
                    - name: open
                      position: 100
                      icon: mdi:window-shutter-open
```
