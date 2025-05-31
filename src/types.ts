/**
 * Represents an item in the virtual list.
 */ 
export interface ListItem {
    id: number,
    name: string,
    data: ObjectData
};

/**
 * Represents the detailed rendering information for a material.
 * Keys are specific render parameters, and values can be strings (e.g., "true", "0")
 * or numbers (e.g., 0.5, 100.0).
 */
export interface RenderInfo {
  [key: string]: string | number;
}

/**
 * Defines the properties associated with a specific material within a model.
 * This includes render settings, sampler names, skinning counts, and texture names.
 */
export interface MaterialProperties {
  "Render Info": RenderInfo;
  Samplers: string[];
  "Skin Counts": number[];
  Textures: string[];
}

/**
 * Represents a collection of materials for a single model (e.g., "Bass").
 * Keys are material names (e.g., "Mt_Body", "Mt_Eye"), and values are their respective
 * MaterialProperties.
 */
export interface ModelData {
  [materialName: string]: MaterialProperties;
}

/**
 * Represents the data for a specific asset (e.g., "Bass" within "Animal_Bass.Bass.bfres.mc").
 * Keys are asset-specific identifiers, and values are the ModelData for that asset.
 */
export interface ObjectData {
  [assetIdentifier: string]: ModelData;
}

/**
 * The top-level interface for your entire dataset.
 * Keys are file names or top-level identifiers (e.g., "Animal_Bass.Bass.bfres.mc"),
 * and values are the AssetData associated with that file.
 */
export interface RootData {
  [bfresName: string]: ObjectData;
}

/**
 * Data directly converted to an array using Object.entries.
 */
export interface EntryData {
  [bfresName: string]: ObjectData;
}[]