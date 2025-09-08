export const getInputType = (dbType) => {
    switch (dbType.toUpperCase()) {
      case 'CHARACTER VARYING':
        return 'text';
      case 'TEXT':
        return 'textarea';
      case 'NUMERIC':
        return 'number';
      case 'INTEGER':
        return 'number';
      case 'DATE':
        return 'date';
      default:
        return 'text';
    }
  };