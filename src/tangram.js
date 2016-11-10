const ADDRESS_KEY_DELIMITER = ':';

/**
 * Return an array of key names from an address
 * An empty string will still return an array whose first item
 * is the empty string.
 *
 * @param {string} address - in the form of 'key1:key2:key3'
 * @return {Array} keys
 */
function getKeysFromAddress(address) {
    return address.split(ADDRESS_KEY_DELIMITER);
}

/**
 * Returns the content given an address
 * If for any reason the content is not found, return an empty string
 *
 * @param {Object} tangramScene - Tangram's parsed object tree of scene content
 * @param {string} address - in the form of 'key1:key2:key3'
 * @return {mixed} content - Whatever is stored as a value for that key
 */
export function getAddressSceneContent(tangramScene, address) {
    try {
        const keys = getKeysFromAddress(address);

        // Looks up content in Tangram's scene.config property.
        // It's a nested object, so to look up from an array of nested keys,
        // we reduce this array down to a single reference.
        // e.g. ['a', 'b', 'c'] looks up content in
        // tangramScene.config['a']['b']['c']
        const content = keys.reduce((obj, property) => obj[property], tangramScene.config);

        return content;
    } catch (error) {
        return '';
    }
}