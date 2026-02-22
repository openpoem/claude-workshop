const request = require('supertest');
const app = require('../src/app');

describe('Users API', () => {

  // TEST 1: Should return empty array — PASSES
  test('GET /api/users returns empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  // TEST 2: Should return 201 on create — FAILS (bug: returns 200)
  test('POST /api/users returns 201 on success', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Ron', email: 'ron@visma.com' });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Ron');
  });

  // TEST 3: Should reject missing fields — FAILS (bug: no validation)
  test('POST /api/users returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  // TEST 4: Should return 204 on delete — FAILS (bug: returns 200 with body)
  test('DELETE /api/users/:id returns 204 no content', async () => {
    // First create a user
    await request(app)
      .post('/api/users')
      .send({ name: 'ToDelete', email: 'delete@test.com' });

    const res = await request(app).delete('/api/users/1');
    expect(res.status).toBe(204);
  });

  // TEST 5: Should return 404 for unknown user — PASSES
  test('GET /api/users/999 returns 404', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
  });

});
