function toPgDate(date) {
  return new Date(date).toISOString().split('T')[0];
};

exports.toPgDate = toPgDate;
