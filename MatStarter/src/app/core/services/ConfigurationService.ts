import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationResonse } from 'src/app/shared/models/ConfigModels';
import { convertArrayToKeyValuePair } from 'src/app/shared/utilities/helper';

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService {
    public configurations: (ConfigurationResonse | undefined | null) = null;
    public _appConfigurationsData: any = null;

    constructor() { }

    public loadConfigurations() {
        // // this.configurations = {
        // //     appConfigurations: [],
        // //     environment: 'local'
        // // };

        /** TODO: Replace with actual call
         * call http service
         *  initialize configurations data 
         */

        // set appConfigurationsData
        if (!!this.configurations?.appConfigurations && this.configurations?.appConfigurations?.length > 0) {
            this._appConfigurationsData = convertArrayToKeyValuePair(this.configurations?.appConfigurations, 'key', 'value');
        }
    }
}
