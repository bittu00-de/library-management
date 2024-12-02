exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') return res.status(403).send('Access denied.');
    next();
};

exports.isLibrarianOrAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Librarian') return res.status(403).send('Access denied.');
    next();
};