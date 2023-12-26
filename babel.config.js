module.exports = function (api) {
    const isProdMode = process.env.NODE_ENV === 'production';

    api.cache(!isProdMode);

    const plugins = isProdMode ? ['transform-remove-console'] : [];

    return {
        plugins,
    };
};
