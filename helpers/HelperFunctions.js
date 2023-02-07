export const formatDateDDMMYY = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
}

export const lightenColor = (hex) => {
    const amount = 20;

    var R = parseInt(hex.substring(0, 2), 16);
    var G = parseInt(hex.substring(2, 4), 16);
    var B = parseInt(hex.substring(4, 6), 16);

    R = R + (255 - R) * amount / 100;
    G = G + (255 - G) * amount / 100;
    B = B + (255 - B) * amount / 100;

    R = Math.round(R).toString(16);
    G = Math.round(G).toString(16);
    B = Math.round(B).toString(16);

    if (R.length === 1)
        R = "0" + R;
    if (G.length === 1)
        G = "0" + G;
    if (B.length === 1)
        B = "0" + B;

    return R + G + B;
}