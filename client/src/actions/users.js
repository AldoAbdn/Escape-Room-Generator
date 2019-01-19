const mapDispatchToProps = (dispatch, { services }) => ({
    onCreateUser: (text) => {
        dispatch(services.users.create({ text }));
    },
    onGetUser: (id) => {
        dispatch(services.users.get(id));
    },
    onPatchUser: (id,text) => {
        dispatch(services.users.patch(id, { text }));
    },
    onRemoveUser: (id) => {
        dispatch(services.users.remove(id));
    },
    onFindUser: () => {
        dispatch(services.users.find());
    },
    onResetUser: () => {
        dispatch(services.users.reset());
    },
});

export default mapDispatchToProps;