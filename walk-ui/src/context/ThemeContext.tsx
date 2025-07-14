import React, { createContext, useContext, useState, ReactNode } from "react";
import { FluentProvider, makeStyles, webDarkTheme ,webLightTheme} from "@fluentui/react-components";

interface ThemeContextPropType {
    children: ReactNode;
}


interface ThemeContextProvider {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles({
    themeTransition: {
      transition: "background-color 0.5s ease, color 0.5s ease",
     
    },
  });
  

const ThemeContext = createContext<ThemeContextProvider | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeContextPropType) => {
    const [theme, setTheme] = useState('light');
    const styles = useStyles();
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <FluentProvider className={styles.themeTransition} theme={theme === 'light' ? webLightTheme : webDarkTheme}>
                {children}
            </FluentProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("ThemeContext must be used within a ThemeContext");
    }
    return context;
};
