import Stack from "react-bootstrap/esm/Stack"
import styles from './styles/UserSettingStyles.module.css'

export function ToggleSetting({ currentSetting, updateSetting, settingName, children }) {

    const RenderToggleButton = () => {
        return (
            <button id={settingName} className={`${styles.settingsToggleInput} w-25 interfaceButton`} onClick={() => updateSetting(settingName, !currentSetting)}>
                {currentSetting ? 'On' : 'Off'}
            </button>
        )
    }

    return (
        <Stack direction="horizontal" className={`w-100`}>
            <label htmlFor={settingName} className={`${styles.settingsLabel} w-75`}>{children}</label>
            <RenderToggleButton />
        </Stack>
    )
}