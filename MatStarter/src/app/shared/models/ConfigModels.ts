export interface ConfigurationResonse {
    appConfigurations?: Configuration[];
    environment?: string;
}

export interface Configuration {
    key: string;
    value: any;
}

export enum AppConfigurationConstants {
    MockServicesEnabled = 'MockServicesEnabled',
}
