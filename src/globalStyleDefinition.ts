export function getStyle(): string {
    return '.addravatar-avatar {' +
                'animation: fadein 300ms;' +
            '}' +
            '@keyframes fadein {' +
                'from {' +
                    'opacity:0;' +
                '}' +
                'to {' +
                    'opacity:1;' +
                '}' +
            '}';
}