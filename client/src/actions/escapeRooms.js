const mapDispatchToProps = (dispatch, { services }) => ({
    onCreateEscapeRoom: (text) => {
        dispatch(services.escapeRooms.create({ text }));
    },
    onGetEscapeRoom: (id) => {
        dispatch(services.escapeRooms.get(id));
    },
    onPatchEscapeRoom: (id,text) => {
        dispatch(services.escapeRooms.patch(id, { text }));
    },
    onRemoveEscapeRoom: (id) => {
        dispatch(services.escapeRooms.remove(id));
    },
    onFindEscapeRoom: () => {
        dispatch(services.escapeRooms.find());
    },
    onResetEscapeRoom: () => {
        dispatch(services.escapeRooms.reset());
    },
});

export default mapDispatchToProps;