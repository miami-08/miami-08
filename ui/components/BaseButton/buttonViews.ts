import { colors } from 'ui/colors';

export const buttonViews = {
    light: {
        danger: {
            backgroundColor: colors.danger,
            color: colors.white,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        primary: {
            backgroundColor: colors.primary,
            color: colors.white,
            hover: {
                color: colors.white,
                backgroundColor: colors.lightPrimary,
            },
        },
        success: {
            backgroundColor: colors.success,
            color: colors.white,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        warning: {
            backgroundColor: colors.warning,
            color: colors.white,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        dangerFlat: {
            backgroundColor: 'transparent',
            color: colors.danger,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        primaryFlat: {
            backgroundColor: 'transparent',
            color: colors.primary,
            hover: {
                color: colors.lightPrimary,
                backgroundColor: 'transparent',
            },
        },
        successFlat: {
            backgroundColor: 'transparent',
            color: colors.success,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        warningFlat: {
            backgroundColor: 'transparent',
            color: colors.warning,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
    },
    sea: {
        danger: {
            backgroundColor: colors.danger,
            color: colors.black,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        primary: {
            backgroundColor: colors.primary,
            color: colors.black,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        success: {
            backgroundColor: colors.success,
            color: colors.black,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        warning: {
            backgroundColor: colors.warning,
            color: colors.black,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        dangerFlat: {
            backgroundColor: 'transparent',
            color: colors.danger,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        primaryFlat: {
            backgroundColor: 'transparent',
            color: colors.darkBlue,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        successFlat: {
            backgroundColor: 'transparent',
            color: colors.success,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
        warningFlat: {
            backgroundColor: 'transparent',
            color: colors.warning,
            hover: {
                color: colors.white,
                backgroundColor: colors.danger,
            },
        },
    },
};

export const sizes = {
    l: {
        padding: '20px',
        fontSize: '20px',
    },
    m: {
        padding: '15px',
        fontSize: '15px',
    },
    s: {
        padding: '12px',
        fontSize: '14px',
    },
};
