export interface PhotoInfo {
    id: string
    text: string
    type: string
    img: string
}

export interface AlertMsg {
    type: string
    text: string
}

export const VALID_FILTER_TYPES = ['', 'selfie', 'regular']