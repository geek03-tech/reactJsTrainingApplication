import { getEmployees } from './employeeService';
import { apiRequest } from './apiClient';

jest.mock('./apiClient', () => ({
  apiRequest: jest.fn(),
}));

describe('employeeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('replaces ReqRes avatar URLs with a safe fallback avatar', async () => {
    apiRequest.mockResolvedValue({
      page: 1,
      per_page: 6,
      total: 1,
      total_pages: 1,
      data: [
        {
          id: 1,
          email: 'janet.weaver@reqres.in',
          first_name: 'Janet',
          last_name: 'Weaver',
          avatar: 'https://reqres.in/img/faces/user-1.jpg',
        },
      ],
    });

    const result = await getEmployees(1);

    expect(result.data[0].avatar).toContain('i.pravatar.cc');
    expect(result.data[0].avatar).not.toContain('reqres.in');
  });
});
