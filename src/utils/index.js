export const getInputType = (dbType)=> {
  switch (dbType.toLowerCase()) {
    case 'text':
      return 'text';
    case 'string':
      return 'text';
    case 'textarea':
      return 'textarea';
    case 'number':
      return 'number';
    case 'date':
      return 'date';
    case 'boolean':
      return 'checkbox';
    case 'objectid':
      return 'text';
    case 'uuid':
      return 'text';
    default:
      return 'text';
  }
};