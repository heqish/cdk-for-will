import unittest
from handler import handler

class TestHandler(unittest.TestCase):
    def test_handler(self):
        response = handler(None, None)
        self.assertEqual(response['statusCode'], 200)
        self.assertEqual(response['body'], 'Hello from Lambda!')

if __name__ == '__main__':
    unittest.main()