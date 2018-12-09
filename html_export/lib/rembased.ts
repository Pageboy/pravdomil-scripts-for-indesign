interface PravdomilExportOptionsSettings {
    rembasedDebug?: boolean;
}

function pravdomilExportRembasedDebug(opt: PravdomilExportOptions) {
    if (opt.settings.rembasedDebug) {
        opt.headFilters.push(pravdomilExportRembasedDebugFilter);
    }
}

// noinspection JSUnusedLocalSymbols
function pravdomilExportRembasedDebugFilter(opt: PravdomilExportOptions, i: number, str: string) {
    str += `<script src="https://cdn.jsdelivr.net/gh/pravdomil/rembased@master/js/rembased.js" defer><\/script>\n`;
    return str;
}
